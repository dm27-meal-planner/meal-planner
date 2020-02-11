INSERT INTO users (username, email, household_size, uid)
VALUES ($1, $2, $3, $4);
SELECT * FROM users WHERE username = $1