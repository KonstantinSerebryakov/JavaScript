CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `worker_full_view` AS
    SELECT 
        `workers`.`id` AS `id`,
        `logbook`.`created_at` AS `created_at`,
        `works`.`name` AS `name`,
        `logbook`.`salary` AS `salary`,
        `total`.`months_total` AS `total`
    FROM
        (((`logbook`
        JOIN `workers` ON ((`logbook`.`worker_id` = `workers`.`id`)))
        JOIN `works` ON ((`logbook`.`work_id` = `works`.`id`)))
        JOIN (SELECT 
            `logbook`.`worker_id` AS `worker_id`,
                SUM(`logbook`.`salary`) AS `months_total`
        FROM
            `logbook`
        GROUP BY `logbook`.`worker_id`) `total` ON ((`total`.`worker_id` = `logbook`.`worker_id`)))