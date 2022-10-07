fetch('https://mesto.nomoreparties.co/v1/cohort-51/cards/users/me ', {
  headers: {
    authorization: '0aa0db8f-1663-456c-947a-270a3646c3a8'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

// c0fe93bd02816e72b575c7ab
