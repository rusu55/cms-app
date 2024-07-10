model Project {
    id                String      @id @default(auto()) @map("_id") @db.ObjectId
    projectDate       DateTime
    status            Status      @default(Shoot)
    photoEditDueDate  DateTime?
    photoEditDoneDate DateTime?
    photoEditBy       Contractor? @relation("PhotoEdit")
    videoEditBy       Contractor? @relation("VideoEdit")
    videoEditDueDate  DateTime?
    videoEditDoneDate DateTime?
    photoBooth        Boolean?
    clientId          String      @unique @db.ObjectId
    client            Client      @relation(fields: [clientId], references: [id], onDelete: Cascade)
  }
  
  model Contractor {
    id        String   @id @default(auto()) @map("_id") @db.ObjectId
    name      String
    email     String?  @unique
    phone     String?
    role      String[]
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    photoId   String?  @unique @db.ObjectId
    photoEdit Project? @relation("PhotoEdit", fields: [photoId], references: [id], onDelete: Cascade)
    videoId   String?  @unique @db.ObjectId
    videoEdit Project? @relation("VideoEdit", fields: [photoId], references: [id], onDelete: Cascade)
  }