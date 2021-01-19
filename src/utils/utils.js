const REQUEST_STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  IDLE: 'idle',
  REJECTED: 'rejected',
};

const reducer = (state, action) => {
  switch (action.status) {
    case REQUEST_STATUS.IDLE:
      return {
        status: REQUEST_STATUS.IDLE,
        data: null,
        error: null,
      };

    case REQUEST_STATUS.PENDING:
      return {
        status: REQUEST_STATUS.PENDING,
        data: null,
        error: null,
      };

    case REQUEST_STATUS.RESOLVED:
      return {
        status: REQUEST_STATUS.RESOLVED,
        data: action.data,
        error: null,
      };

    case REQUEST_STATUS.REJECTED:
      return {
        status: REQUEST_STATUS.REJECTED,
        data: null,
        error: action.error,
      };

    default:
      throw Error(`Unhandled status: ${action.status}`);
  }
};

export {
  REQUEST_STATUS,
  reducer,
};
