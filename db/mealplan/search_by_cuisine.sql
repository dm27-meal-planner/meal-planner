SELECT r.* FROM recipes r 
INNER JOIN cuisine c on c.cuisine_id = r.cuisine_id
WHERE c.cuisine_name = $1