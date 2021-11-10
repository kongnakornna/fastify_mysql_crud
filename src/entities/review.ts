import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Store } from "./store";
@Entity()
export class Review extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  storeId!: number;

  @Column()
  score!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne((_type) => Store, (store) => store.reviews, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "storeId" })
  store!: Store;
}
