import React from 'react'

interface ErrorProps {
    errorsList: Record<string, string>
}

const ShowErrors: React.FC<ErrorProps> = ({ errorsList }) => {
    return (
        <>
            <ul>
                {Object.entries(errorsList).map(([field, message]) => (
                    <li key={field}>
                        <strong>{field}:</strong> {message}
                    </li>
                ))}
            </ul>

        </>
    )
}

export default ShowErrors;
