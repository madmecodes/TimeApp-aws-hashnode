/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem(
    $filter: ModelSubscriptionItemFilterInput
    $owner: String
  ) {
    onCreateItem(filter: $filter, owner: $owner) {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem(
    $filter: ModelSubscriptionItemFilterInput
    $owner: String
  ) {
    onUpdateItem(filter: $filter, owner: $owner) {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem(
    $filter: ModelSubscriptionItemFilterInput
    $owner: String
  ) {
    onDeleteItem(filter: $filter, owner: $owner) {
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
