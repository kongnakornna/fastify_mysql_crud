import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
@Entity()
  
 export class Sd_users {
    @PrimaryGeneratedColumn()
    user_id!: number
       
    @Column({ nullable: true,})
    firstname!:string
    
    @Column({ nullable: true,})
    lastname!: string
    
    @Column({
      unique: false,
      nullable: true,
      })
    fullname!: string
      
    @Column({
      unique: false,
      nullable: true,
      })
    nickname!: string
      
    @Column({ unique: true, })
    username!: string
    
    @Column({ unique: false, })
    password!: string
    
    @Column({ unique: true, })
    email!: string
    
    @Column({
      unique: false,
      nullable: true,
      })
    level!: number
    
    @Column({
      unique: false,
      nullable: true,
      })
    status!: number
    
    @Column({
      unique: false,
      nullable: true,
      })
    network_id!: string
    
    @Column({
      unique: false,
      nullable: true,
      })
    avatar!: string
    
    @Column({unique: false, nullable: true,type: "varchar", length: 80 })
    idcard!: string
    
    @Column({
            type: 'text',
            unique: false,
            nullable: true,
      })
    remark!: string
    
    @Column({
      unique: false,
      nullable: true,
      })
    infomation_agree_status!: number
    
    @Column({
      unique: false,
      nullable: true,
      })
    gender!: number
     
    @Column({
      unique: false,
      nullable: true,
      })
    birthday!: string
     
    @Column({ type: 'datetime',unique: true,nullable: true})
    date!: string
    
    @Column({ unique: false, nullable: true,})
    last_sign_in!: string
    
    @Column({ unique: false, nullable: true,})
    online_status!: number
    
    @Column({unique: false, nullable: true,type: "varchar", length: 255 })
    mesage!: string
 
    @Column({unique: false,nullable: true,})
    password_temp!: string
    
    @Column({
      unique: false,
      nullable: true,
      })
      profile_id!: string
    
    @Column({unique: true,nullable: true,})
    network_type_id!: number

    @Column({ unique: false,nullable: true, })
    public!: number

    @Column({ unique: false, nullable: true, })
    isActive!: boolean

 }
 