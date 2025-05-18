interface TotalProps {
    total: number
}

const Total = (props: TotalProps) => {
    return (
        <footer
            style={{
                fontSize: '1.5rem',
            }}
        >
            <p>
                Number of exercises:
                <span>{` ${props.total}`}</span>
            </p>
        </footer>
    )
}

export default Total