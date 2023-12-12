import axios from "axios"
import { AppDispatch } from ".."
import $api from "../../requests/instance"
import { toggleIsFetching, getAuthError } from "./uploadSlice"

export const getUrl = (files: FileList | null) => (dispatch: AppDispatch) => {
    dispatch(toggleIsFetching(true));
    let promises: Promise<any>[] = [];
  
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const promise = $api.get(`/disk/resources/upload?path=app:/${files[i].name}&overwrite=true`)
          .then(res => {
            const url = res.data.href;
            return { url, file: files[i] };
          })
          .then(({ url, file }) => {
            return axios.put(url, file);
          })
          .catch(err => {
            console.log(err.response.data.message);
            if (err.response.status === 401) {
              dispatch(getAuthError('Необходимо авторизоваться'));
            }
            dispatch(toggleIsFetching(false));
          });
  
        promises.push(promise);
      }
    }
    
    if (promises.length > 0) {
      Promise.all(promises)
        .then(() => {
          dispatch(toggleIsFetching(false));
        })
        .catch(() => {
          dispatch(toggleIsFetching(false));
        });
    } else {
      dispatch(toggleIsFetching(false));
    }
  };

// export const getUrl = (files: FileList | null) => (dispatch: AppDispatch) =>  {
//     dispatch(toggleIsFetching(true))
//         let counter = 0
//         if (files) {
//             for (let i = 0; i < files.length; i++) {
//                 $api.get(`/disk/resources/upload?path=app:/${files[i].name}&overwrite=true`)
//                 .then( res => {
//                     const url = res.data.href
//                     return url
//                 })
//                 // eslint-disable-next-line no-loop-func
//                 .then( (url) => {
//                     axios.put(url, files[i])
//                     .then( () => {
//                         counter++
//                         if (counter === files.length) {
//                             dispatch(toggleIsFetching(false))
//                         }
//                     })
//                     .catch(err => {
//                         console.log(err.response.data.message)
//                         dispatch(toggleIsFetching(false))
//                     })
//                 })
//                 .catch(err => {
//                     console.log(err.response.data.message)
//                     if (err.response.status === 401) {
//                         dispatch(getAuthError('Необходимо авторизоваться'))
//                     }
//                     dispatch(toggleIsFetching(false))
//                 })
//             }
//         }

// }