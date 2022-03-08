export const submitForm = (ev: Event) => {
  ev.preventDefault();

  const target = ev.target as HTMLFormElement;
  const form = (target.nodeName.toLowerCase() === 'button')
    ? (target.closest('form') as HTMLFormElement)
    : target;
  const formData = new FormData(form) as FormData;

  if (formData.get('old-password')) {
    if (formData.get('password') === formData.get('old-password')) {
      console.log('Новый пароль должен отличаться от старого.');
    }
  }

  if (formData.get('new-password')) {
    if (formData.get('password') !== formData.get('new-password')) {
      console.log('Пароль не совпадают.');
    }
  }

  let obj = {};
  for (const elem of formData.entries()) {
    const [key, value] = elem;
    obj = {
      ...obj,
      ...(value ? {
        [key]: value,
      } : {}),
    };
  }
  console.log(obj);
};
