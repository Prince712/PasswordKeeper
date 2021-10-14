export const ShowToast = (title, Toast, id = 'toast') => {
  // let id = 'toast';
  if (!Toast.isActive(id)) {
    Toast.show({
      id,
      title: title,
      placement: 'top',
      status: 'warning',
    });
  }
};

export const ShowToastError = (title, Toast, id = 'toast') => {
    // let id = 'toast';
    if (!Toast.isActive(id)) {
      Toast.show({
        id,
        title: title,
        placement: 'top',
        status: 'error',
      });
    }
  };