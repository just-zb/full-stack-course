import {CoursePart} from "../App.tsx";

interface PartProps {
    part: CoursePart
}

const Part = (props: PartProps) => {
    const part = props.part

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        )
    }

    switch (part.kind) {
        case 'basic':
            return (
                // <p>
                //   {part.name} {part.exerciseCount} {part.description}
                // </p>

                <>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>

                    <p
                        style={{
                            fontStyle: 'italic',
                            margin: 0,
                        }}
                    >
                        {part.description}
                    </p>
                </>
            )

        case 'group':
            return (
                // <p>
                //   {part.name} {part.exerciseCount} {part.groupProjectCount}
                // </p>

                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>

                    <p
                        style={{
                            margin: 0,
                        }}
                    >
                        project exercises {part.groupProjectCount}
                    </p>
                </div>
            )

        case 'background':
            return (
                // <p>
                //   {part.name} {part.exerciseCount} {part.description}{' '}
                //   {part.backgroundMaterial}
                // </p>

                <>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>

                    <p
                        style={{
                            fontStyle: 'italic',
                            margin: 0,
                        }}
                    >
                        {part.description}
                    </p>

                    <p
                        style={{
                            margin: 0,
                        }}
                    >
                        {`submit to ${part.backgroundMaterial}`}
                    </p>
                </>
            )

        case 'special':
            return (
                // <p>
                //   {part.name} {part.exerciseCount} {part.description}{' '}
                //   {part.requirements.join(', ')}
                // </p>

                <>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>

                    <p
                        style={{
                            fontStyle: 'italic',
                            margin: 0,
                        }}
                    >
                        {part.description}
                    </p>
                    <p
                        style={{
                            margin: 0,
                        }}
                    >
                        {`required skills: ${part.requirements.join(', ')}`}
                    </p>
                </>
            )

        default:
            return assertNever(part)
    }
}

interface ContentProps {
    parts: CoursePart[]
}

const Content = (props: ContentProps) => {
    return (
        <main
            style={{
                margin: '2.5rem 0',
            }}
        >
            {props.parts.map((part) => {
                return (
                    <div
                        key={part.name}
                        style={{
                            margin: '1.5rem 0',
                        }}
                    >
                        <Part part={part} />
                    </div>
                )
            })}
        </main>
    )
}

export default Content