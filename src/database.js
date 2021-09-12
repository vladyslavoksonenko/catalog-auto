

const url = "http://192.168.1.155/posts";



export const addPost = async (state) => {
  const formdata = new FormData();
  formdata.append("name", state.nameCar);
  formdata.append("description", state.description);
  formdata.append("image", state.file);
  formdata.append("price", state.price);

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  return fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
     return error;
    })


}

export const getPosts = async () => {
    try {
        const response = await fetch(url)
        if (response.ok) {
            let json = await response.json();
            return json
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    } catch (e) {
        alert(e)
        throw e
    }
}

export const getPost = async (id) => {
    try {
        const linkId = url + "/" + id;
        const response = await fetch(linkId)
        if (response.ok) {
            let json = await response.json();
            return json
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    } catch (e) {
        alert(e)
        throw e
    }
}

