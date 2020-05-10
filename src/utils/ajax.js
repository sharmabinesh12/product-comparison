
let headers = {
    'Content-Type': 'application/json',
    'Accept' :'application/json'
};


export async function get (url) {
  return new Promise(function (resolve, reject) {
    try {
      if (null === url || undefined === url || '' === url) {
        reject('URL not present.');
      } else {
        const token = localStorage.getItem('id_token');     
        if (token) {
          headers.Authorization = token;
        }
        const options = {
          method: 'GET',
          headers: headers
        };
        fetch(url, options)
          .then(res => res.status !== 204 &&res.json())
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error) });
      }
    } catch (error) {
      reject(error)
    }
  });
}

 