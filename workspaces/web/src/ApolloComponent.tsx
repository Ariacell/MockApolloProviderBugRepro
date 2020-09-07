import React, { Dispatch, SetStateAction } from 'react';
import { useLazyQuery, gql } from '@apollo/client';


interface ApolloComponentProps {
    counter: {
        count: number,
        setCount: Dispatch<SetStateAction<number>>
    }
}

export const GET_OBJECT_WITH_ARRAY = gql`query {
    getObjectWithArray {
      objectId
      objectList {
        subOjectId
        subObjectName
        subObjectDescription
      }
    }
  }
`

const ApolloComponent: React.FC<ApolloComponentProps> = ({counter}) => {

    const [lazyQuery, result] = useLazyQuery(GET_OBJECT_WITH_ARRAY)

    let ResultComp;

    if (result.loading) {
        ResultComp = <p>LOADING!</p>
    } else if (result.error) {
        ResultComp = <p>ERROR! {JSON.stringify(result.error)}</p>
    } else if (result.data) {
        ResultComp = <p>
            {result.data.getObjectWithArray.objectId}
            <br />
            {JSON.stringify(result.data.getObjectWithArray.objectList)}
        </p>
    } else {
        ResultComp = <p>NOTHING DONE YET</p>
    }

    const executeLazyQuery = () => {
        lazyQuery();
        counter.setCount(counter.count + 1);
    }

    return (
        <div>
            <button onClick={() => executeLazyQuery()}>Click to execute lazy query :)</button>
            <h3>
                The query came back with:
            </h3>
            <span>
            {ResultComp}
            </span>
            <p>
                lazyQuery has been called: {counter.count} times!
            </p>

        </div>
    )
}

export default ApolloComponent;