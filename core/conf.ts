// Para tener no tocar directamente variables de entorno y tenerlas tipadas
const CONF = {
    PORT: Number(process.env.PORT),
    DB_URL : process.env.DB_URL!,
    JWT_SECRET : process.env.JWT_SECRET,
    SALT_ROUND: Number(process.env.SALT_ROUND)
}

export default CONF
