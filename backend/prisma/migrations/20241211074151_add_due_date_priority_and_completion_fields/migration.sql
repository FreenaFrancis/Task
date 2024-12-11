-- AlterTable
ALTER TABLE `task` ADD COLUMN `completedAt` DATETIME(3) NULL,
    ADD COLUMN `dueDate` DATETIME(3) NULL,
    ADD COLUMN `priority` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'todo';

-- CreateTable
CREATE TABLE `Subtask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `isChecked` BOOLEAN NOT NULL DEFAULT false,
    `completedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subtask` ADD CONSTRAINT `Subtask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
