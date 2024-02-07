module.exports = (sequelize, dataTypes) => {
    const Categoria = sequelize.define("Categorias", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        category_name: {
            type: dataTypes.STRING(100),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "category",
        timestamps: false
    })

    Categoria.associate = function(models){
        Categoria.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id"
        })
    }

    return Categoria
}