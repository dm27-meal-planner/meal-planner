INSERT INTO ingredients(ingredient_name, cost, nutrients, 
spoon_id, image, check_api)
VALUES($1, $2, $3, $4, $5, $6)
returning *;