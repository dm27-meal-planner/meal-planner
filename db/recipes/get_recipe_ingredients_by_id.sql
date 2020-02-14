select i.ingredient_id id, i.ingredient_name name
ri.quantity amount, ri.unit
from ingredients i
inner join recipe_ingredients ri
on i.ingredient_id = ri.ingredient_id
where ri.recipe_id = $1