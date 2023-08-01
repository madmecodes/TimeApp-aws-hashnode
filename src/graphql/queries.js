/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      color
      date
      icon
      id
      isRunning
      targetTime {
        h
        m
        __typename
      }
      timeElapsed
      title
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        color
        date
        icon
        id
        isRunning
        targetTime {
          h
          m
          __typename
        }
        timeElapsed
        title
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
