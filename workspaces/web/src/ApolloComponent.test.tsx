import React from 'react';
import { render } from '@testing-library/react';
import {MockedProvider} from '@apollo/react-testing'
import { GraphQLRequest, FetchResult } from '@apollo/client';
import { ResultFunction } from '@apollo/client/utilities/testing/mocking/mockLink';
import ApolloComponent, { GET_OBJECT_WITH_ARRAY } from './ApolloComponent';


describe('ApolloComponent', () => {
    it('should render nothing done yet with MockedProvider', () => {
        const comp = render(<MockedProvider mocks={[getObjectWithArrayMockData.success[0]]}>
            <ApolloComponent counter={{count: 0, setCount: jest.fn()}}/>
        </MockedProvider>)
        comp.getByText('NOTHING DONE YET');
    })
})


interface MockQueryEntry<T> {
    request: GraphQLRequest;
    newData?: ResultFunction<FetchResult<T>>;
    result?: FetchResult<T>;
    error?: Error
}

interface MockQueryData<T> {
    success: [MockQueryEntry<T>]
    error?: [MockQueryEntry<T>]
}

const getObjectWithArrayMockData: MockQueryData<any> = {
    success: [{
        request: {
            query: GET_OBJECT_WITH_ARRAY,
            variables: {}
        },
        newData: jest.fn().mockImplementation(() => ({
            data: {
                getObjectWithArray: {
                    objectId: 'mocked object id 1',
                    objectList: [{
                        subOjectId: 'mocked subId 1',
                        subObjectName: 'mocked Name 1',
                        subObjectDescription: 'mocked descr 1'
                    }]
                }
            }
        }))
    }]
};