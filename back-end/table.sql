-- Active: 1653331321827@@35.226.146.116@3306@silveira-21814331-eric-silva
CREATE TABLE interest_table(  
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    cpf VARCHAR(255) NOT NULL,
    birthData VARCHAR(255) NOT NULL,
    rate FLOAT NOT NULL,
    loanAmount FLOAT NOT NULL,
    amountPerMonth FLOAT NOT NULL,
    infoPayment TEXT NOT NULL
)