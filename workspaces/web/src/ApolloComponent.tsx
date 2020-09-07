import React, { Dispatch, SetStateAction } from 'react';
import { useLazyQuery, gql } from '@apollo/client';


interface ApolloComponentProps {
    counter: {
        count: number,
        setCount: Dispatch<SetStateAction<number>>
    }
}

const GET_OBJECT_WITH_ARRAY = gql`query {
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
        ResultComp = <div>LOADING!</div>
    } else if (result.error) {
        ResultComp = <div>ERROR! {JSON.stringify(result.error)}</div>
    } else if (result.data) {
        ResultComp = <div>
            {result.data.getObjectWithArray.objectId}
            <br />
            {JSON.stringify(result.data.getObjectWithArray.objectList)}
        </div>
    } else {
        ResultComp = <div>NOTHING DONE YET</div>
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
            <p>
            {ResultComp}
            </p>
            <div>
                lazyQuery has been called: {counter.count} times!
            </div>

        </div>
    )
}

export default ApolloComponent;