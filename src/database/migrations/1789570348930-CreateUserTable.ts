import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1789570348930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "name" varchar(100) NOT NULL,
                "email" varchar(100) NOT NULL UNIQUE,
                "password" varchar(255) NOT NULL,
                "role" varchar(50) NOT NULL DEFAULT 'ATTENDANT',
                "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users";`);
    }

}