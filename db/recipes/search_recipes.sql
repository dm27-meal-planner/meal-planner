select distinct r.recipe_id, r.image recipe_img
, r.name recipe_name, 'mealplan' recipe_source
, u.username recipe_author, 0 recipe_review
, r.prep_time::INTEGER + r.cook_time::INTEGER recipe_time
from recipes r
inner join users u
on u.user_id = r.user_id
inner join cuisine c
on r.cuisine_id = c.cuisine_id
inner join recipe_ingredients ri
on ri.recipe_id = r.recipe_id
inner join ingredients i
on ri.ingredient_id = i.ingredient_id
where r.name ilike $1
and lower($2) in ('', lower(r.meal_type))
and lower($3) in ('', lower(c.cuisine_name))
and lower($4) in ('', lower(i.ingredient_name) )
;

-- select distinct r.recipe_id, r.image recipe_img
-- , r.name recipe_name, 'mealplan' recipe_source
-- , u.username recipe_author, 0 recipe_review
-- , r.prep_time::INTEGER + r.cook_time::INTEGER recipe_time
-- from recipes r
-- inner join users u
-- on u.user_id = r.user_id
-- inner join cuisine c
-- on r.cuisine_id = c.cuisine_id
-- where lower(r.name) = lower($1)
-- and lower($2) in ('', lower(r.meal_type))
-- and lower($3) in ('', lower(c.cuisine_name))
-- -- and lower($4) in ('', lower(i.ingredient_name) )