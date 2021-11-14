import { getManager, getRepository } from 'typeorm'
import { Sd_users } from '../entities/Sd_users.entities'
import { Sd_users_model } from '../interfaces/Sd_users'
// import { Sd_usersRepository } from '../repositories/Sd_users.repository';

const getAllSd_users = async (): Promise<Sd_users[]> => {
  return await getManager().find(Sd_users)
}

export default {
  getAllSd_users, 
}
