import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from './types'

const baseUrl = 'http://localhost:3005/api/diaries'

export const getAllDiaryEntry = async () => {
  const res = await axios.get<DiaryEntry[]>(`${baseUrl}/all`)
  return res.data
}

export const createDiaryEntry = async (object: NewDiaryEntry) => {
  const res = await axios.post<DiaryEntry>(`${baseUrl}`, object)
  return res.data
}
