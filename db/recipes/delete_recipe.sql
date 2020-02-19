delete from recipes
where recipe_id = $1
returning *;