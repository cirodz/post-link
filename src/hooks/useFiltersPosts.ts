import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { PostEntity } from "../types/types";

interface useFiltersPostsProps {
  ListPosts: PostEntity[];
  keyword: string;
  fechaInicioFiltro?: Dayjs | null;
  fechaFinFiltro?: Dayjs | null;
  fechaPublicacionInicio?: Dayjs | null;
  fechaPublicacionFin?: Dayjs | null;
  FirstFilterOn: boolean;
  SecondFilterOn: boolean;
}

const useFiltersPosts = ({
  ListPosts,
  keyword,
  fechaInicioFiltro,
  fechaFinFiltro,
  fechaPublicacionInicio,
  fechaPublicacionFin,
  FirstFilterOn,
  SecondFilterOn,
}: useFiltersPostsProps) => {
  const filteredPosts = useMemo(() => {
    return ListPosts.filter((post: PostEntity) => {
      const searchPost = keyword.toLowerCase();
      const postCreateDate = dayjs(post.fecha_creacion);
      const postPublishDate = dayjs(post.fecha_publicacion);

      const postsKey =
        post.autor.toLowerCase().includes(searchPost) ||
        post.descripcion?.toLowerCase().includes(searchPost) ||
        post.titulo?.toLowerCase().includes(searchPost);

      const resultsByCreateDate =
        (fechaInicioFiltro
          ? postCreateDate.isAfter(fechaInicioFiltro)
          : true) &&
        (fechaFinFiltro ? postCreateDate.isBefore(fechaFinFiltro) : true);

      const resultsByPublishDate =
        (fechaInicioFiltro
          ? postPublishDate.isAfter(fechaPublicacionInicio)
          : true) &&
        (fechaFinFiltro ? postPublishDate.isBefore(fechaPublicacionFin) : true);

      if (FirstFilterOn) {
        return postsKey && resultsByCreateDate;
      }
      if (SecondFilterOn) {
        return postsKey && resultsByPublishDate;
      }
      if (FirstFilterOn && SecondFilterOn) {
        return postsKey && resultsByCreateDate && resultsByPublishDate;
      }

      return postsKey;
    });
  }, [
    ListPosts,
    keyword,
    fechaInicioFiltro,
    fechaFinFiltro,
    fechaPublicacionInicio,
    fechaPublicacionFin,
    FirstFilterOn,
    SecondFilterOn,
  ]);

  return filteredPosts;
};

export default useFiltersPosts;
