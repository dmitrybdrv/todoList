import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': 'a8cce568-8f67-4918-8615-1e9ca1e6617a'
	}
})