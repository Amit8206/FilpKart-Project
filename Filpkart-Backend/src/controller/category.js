const slugify = require("slugify");
const Category = require("../models/category");
const shortId = require('shortid')

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;

    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            type: cate.type,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }
    return categoryList;
}



exports.addCategory = (req, res) => {
    categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortId.generate()}`
    }

    if (req.file) {
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);

    cat.save((err, category) => {
        if (err) return res.status(400).json({ err });
        if (category) {
            return res.status(201).json({ category });
        }
    })
}


exports.getCategories = (req, res) => {
    Category.find({})
        .exec((err, categories) => {
            if (err) return res.status(400).json({ err });
            if (categories) {

                const categoryList = createCategories(categories);

                return res.status(200).json({ categoryList });
            }
        })
}


exports.updateCategories = async (req, res) => {

    const {_id, name, parentId, type } = req.body;
    const updatedCategories = [];

    if(name instanceof Array){
        for(let i = 0; i < name.length; i++){
            const category = {
                name: name[i],
                type: type[i]
            }
            if(parentId[i] !== ''){
                category.parentId = parentId[i];
            }
            const updatedCategory = await Category.findByIdAndUpdate({_id: _id[i]}, category, {new:true});
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({updatedCategories: updatedCategories});
    }else {
        const category = {
            name: name,
            type: type
        }
        if(parentId !== ''){
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findByIdAndUpdate({_id: _id}, category, {new:true});
        updatedCategories.push(updatedCategory);
        return res.status(201).json({updatedCategories: updatedCategories});
    }
}


exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for(let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findByIdAndDelete({_id: ids[i]._id});
        deletedCategories.push(deleteCategory);
    }
    if(deletedCategories.length === ids.length){
        res.status(201).json({message: 'Categories Removed !!'});
    }else {
        res.status(400).json({message: 'Somthing Went Wrong !!'});
    }
}