import { axiosInstance } from "../../../services/axios";

export function getCatalog() {
    return axiosInstance.get('/products');
}

export function get(id) {
    return axiosInstance.get(`/products/${id}`);
}

// export function create({ title = 'Test title', body = 'Test body' }) {
//     return axiosInstance.post(`/catalog`, {
//         title,
//         body,
//     });
// }

// export function update(id, { title = 'Test title', body = 'Test body' }) {
//     return axiosInstance.put(`/catalog/${id}`, {
//         title,
//         body,
//     });
// }

// export function remove(id) {
//     return axiosInstance.delete(`/catalog/${id}`);
// }