import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Console } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cart = [];
const wish = [];
const product = [];
const order=[];


const app = express();
const port = 3000;
// Set 'ejs' as the view engine
app.set('view engine', 'ejs');

// Specify the directory where your views are located
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));
// Serve static assets from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
// Serve jQuery from the 'node_modules' directory
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// database work
mongoose.connect('mongodb://127.0.0.1:27017/Product_list', { useNewUrlParser: true });
const productschema = {
    name: String
};
const electronicschema = {
    name: String,
    image: String,
    price: Number,
    description: String,
    rating: Number,
    quantity: Number
};
const sportschema = {
    name: String,
    image: String,
    price: Number,
    description: String,
    rating: Number,
    quantity: Number
};
const beautyschema = {
    name: String,
    image: String,
    price: Number,
    description: String,
    rating: Number,
    quantity: Number
};
const beauty_item = mongoose.model("Beauty", beautyschema);
const sport_item = mongoose.model("sport", sportschema);
const electric_item = mongoose.model("electronic", electronicschema);


// routes work

app.get("/", async (req, res) => {
    const beauty_items = await beauty_item.find({}).exec();
    const electric_items = await electric_item.find({}).exec();
    const sport_items = await sport_item.find({}).exec();
    product.pop();
    
    res.render("app.ejs", {
        beauty_items: beauty_items,
        electric_items: electric_items,
        sport_items: sport_items
    });

});

app.get("/profile", (req, res) => {
    product.pop();
    res.render('pages/profile.ejs');
});
app.get("/order", (req, res) => {
    product.pop();
    res.render('pages/order.ejs',{price:70,
        order:order
        
    });
});
app.post("/order/:index",async(req,res)=>{
order.push(cart);
    
    res.render('pages/order.ejs',{price:req.params.index,
        order:order,
    });

})
app.get("/detail/:index", (req, res) => {

    res.render('pages/product_detail.ejs', { detail: product });
});

app.post("/detail/:index", async (req, res) => {

    const itemIndex = req.params.index;
    const item = await beauty_item.findById(itemIndex).exec();
    const item1 = await sport_item.findById(itemIndex).exec();
    const item2 = await electric_item.findById(itemIndex).exec();

    const items = [item, item1, item2];
    
    for (let i = 0; i < items.length; i++) {
        if (items[i] == null) {
            // console.log("sdhfb")
            continue;
        }
        else {
            product.push(items[i]);
            
            break
        }
    }
    res.render('pages/product_detail.ejs', { detail: product });

});

app.get("/wish", (req, res) => {
    product.splice(0, 1);
    res.render('pages/wish.ejs', {
        productName: wish
    });
});

app.post("/wish/submit/:index", async (req, res) => {

    const itemIndex = req.params.index;
    const item = await beauty_item.findById(itemIndex).exec();
    const item1 = await sport_item.findById(itemIndex).exec();
    const item2 = await electric_item.findById(itemIndex).exec();
    const items = [item, item1, item2];
 
    for (let i = 0; i < items.length; i++) {
        if (items[i] == null) {
            // console.log("sdhfb")
        }
        else {
            wish.push(items[i]);
        }
    }
    res.redirect(req.get('referer'));

});
app.post('/wish/remove/:index', (req, res) => {
    const itemIndex = parseInt(req.params.index);

    if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < wish.length) {
        // Remove the item at the specified index from the cart array
        wish.splice(itemIndex, 1);

     


    }

    res.redirect('/wish'); // Redirect back to the cart page
});


app.get("/cart", (req, res) => {
    // Function to merge objects based on their _id and accumulate quantities in place within the array
    product.splice(0, 1);
    function mergeObjectsInCart(arr) {
        const quantityMap = {};

        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            const { _id, quantity } = obj;

            if (!quantityMap[_id]) {
                quantityMap[_id] = { ...obj }; // Save the reference to the object
                quantityMap[_id].quantity = quantity || 0;
            } else if (quantity) {
                quantityMap[_id].quantity += quantity;
                arr.splice(i, 1); // Remove duplicate object
                i--; // Decrement index due to removal
            }
        }

        for (let i = 0; i < arr.length; i++) {
            const { _id } = arr[i];
            if (quantityMap[_id]) {
                arr[i].quantity = quantityMap[_id].quantity;
            }
        }
    }

    // Call the function to perform in-place merging and quantity accumulation on the cart array
    mergeObjectsInCart(cart);
    res.render('pages/cart.ejs', {
        productName: cart,

    });


});


app.post("/cart/submit/:index", async (req, res) => {

    const itemIndex = req.params.index;

    const item1 = await sport_item.findById(itemIndex).exec();
    const item2 = await electric_item.findById(itemIndex).exec();
    const item = await beauty_item.findById(itemIndex).exec();

    const items = [item, item1, item2];

    for (let i = 0; i < items.length; i++) {
        if (items[i] == null) {

        }
        else {
            const value = items[i];

            value.quantity = req.body.quantval;
            cart.push(value);
        }
    }

    res.redirect(req.get('referer'));
});
app.post('/cart/remove/:index', (req, res) => {
    const itemIndex = parseInt(req.params.index);

    if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < cart.length) {
        // Remove the item at the specified index from the cart array
        cart.splice(itemIndex, 1);

    }

    res.redirect('/cart'); // Redirect back to the cart page
});

app.listen(port, () => {
    console.log("server on port:", port);
});



