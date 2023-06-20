//hiển thị toàn bộ tranh
function showAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/painting",
        success: function (data) {
            console.log(data);

            let painting = "";
            painting += `<table border="1">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Width</th>
                    <th>Material</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Categories</th>
                    <th colspan="2">Actions</th>
                </tr>`;

            for (let i = 0; i < data.length; i++) {
                painting += `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].height}</td>
                    <td>${data[i].width}</td>
                    <td>${data[i].material}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].price}</td>
                    <td>`;

                for (let j = 0; j < data[i].categories.length; j++) {
                    painting += `${data[i].categories[j].name}`;

                    if (j < data[i].categories.length - 1) {
                        painting += ", ";
                    }
                }

                painting += `</td>
                <td><button onclick="showFormUpdated(${data[i].id})">Update</button></td>
                <td><button onclick="deleteById(${data[i].id})">Delete</button></td>
                </tr>`;
            }

            painting += `</table>`;
            document.getElementById("display").innerHTML = painting;
        }
    });
}

//hiển thị giao diện chỉnh sửa tranh
function showFormUpdated(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/painting/" + id,
        success: function (data) {
            console.log(data);
            let form = "";
            form += `
            <label>ID</label>
            <input type="text" id="id" value="${data.id}" readonly><br> 
            <label>Name</label>
            <input type="text" id="name" value="${data.name}"><br> 
            <label>Height</label>
            <input type="text" id="height" value="${data.height}"><br> 
            <label>Width</label>
            <input type="text" id="width" value="${data.width}"><br> 
            <label>Material</label>
            <input type="text" id="material" value="${data.material}"><br> 
            <label>Description</label>
            <input type="text" id="description" value="${data.description}"><br> 
            <label>Price</label>
            <input type="text" id="price" value="${data.price}"><br> 
            <label>Categories: </label><br>`;

            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/category",
                success: function (categories) {
                    console.log(categories);
                    for (let i = 0; i < categories.length; i++) {
                        const categoryId = categories[i].id;
                        const categoryName = categories[i].name;

                        // kiểm tra xem có category nào trong painting
                        let isChecked = "";
                        for (let i = 0; i < data.categories.length; i++) {
                            if (data.categories[i].id === categoryId) {
                                isChecked = "checked";
                                break;
                            }
                        }

                        form += `
                            <input type="checkbox" name="selectedCategory" value="${categoryId}" ${isChecked}>
                            <label>${categoryName}</label><br>`;
                    }

                    form += `
                        <button onclick="update()">Cập nhật</button>`;
                    document.getElementById("display").innerHTML = form;
                }
            });
        }
    });
}

// cập nhật tranh
function update() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let height = document.getElementById("height").value;
    let width = document.getElementById("width").value;
    let material = document.getElementById("material").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;

    let selectedCategory = [];
    let categoryCheckboxes = document.querySelectorAll('input[name="selectedCategory"]:checked');

    for (let i = 0; i < categoryCheckboxes.length; i++) {
        let checkbox = categoryCheckboxes[i];
        let category = {
            id: checkbox.value,
            name: checkbox.name
        };
        selectedCategory.push(category);
    }


    let painting = {
        id: id,
        name: name,
        height: height,
        width: width,
        material: material,
        description: description,
        price: price,
        categories: selectedCategory
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "PUT",
        data: JSON.stringify(painting),
        url: "http://localhost:8080/api/painting/" + id,
        success: function (data) {
            console.log(data);
            showAll();
        }
    });
}

// tạo form tạo tranh mới
function showFormCreate() {
    let form = "";
    form += `
    <label>Name</label>
    <input type="text" id="name"><br>
    <label>Height</label>
    <input type="text" id="height"><br>
    <label>Width</label>
    <input type="text" id="width"><br>
    <label>Material</label>
    <input type="text" id="material"><br>
    <label>Description</label>
    <input type="text" id="description"><br>
    <label>Price</label>
    <input type="text" id="price"><br>
    <label>Categories: </label><br>`;

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/category",
        success: function (categories) {
            console.log(categories);
            for (let i = 0; i < categories.length; i++) {
                const categoryId = categories[i].id;
                const categoryName = categories[i].name;
                const isChecked = "";
                form += `
                    <input type="checkbox" name="selectedCategory" value="${categoryId}" ${isChecked}>
                    <label>${categoryName}</label><br>`;
            }
            form += `
            <button onclick="saveNewPainting()">Save</button>`;
            document.getElementById("display").innerHTML = form;
        }
    });
}

function saveNewPainting() {

    let name = $("#name").val();
    let height = $("#height").val();
    let width = $("#width").val();
    let material = $("#material").val();
    let description = $("#description").val();
    let price = $("#price").val();

    let selectedCategory = [];
    let categoryCheckboxes = document.querySelectorAll('input[name="selectedCategory"]:checked');

    for (let i = 0; i < categoryCheckboxes.length; i++) {
        let checkbox = categoryCheckboxes[i];
        let category = {
            id: checkbox.value,
            name: checkbox.name
        };
        selectedCategory.push(category);
    }
    let newPainting = {
        name: name,
        height: height,
        width: width,
        material: material,
        description: description,
        price: price,
        categories: selectedCategory
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/painting",
        data: JSON.stringify(newPainting),
        contentType: "application/json",
        success: function () {
            showAll();
        }
    });
}

function showFormSearch() {
    let form = "";
    form += `
    <span><b>Tìm kiếm theo tên</b></span><br>
    <input type="text" id = "search">
    <button onclick="searchByName()">Search</button><br>`;
    form += `
    <span><b>Tìm kiếm theo category</b></span><br>
    <select id = "id"></select>
    <button onclick="searchByCategory()">Search</button>`;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/category",
        success: function (data) {
            console.log(data)
            let categories = "";
            for (let i = 0; i < data.length; i++) {
                categories += `<option value="${data[i].id}">${data[i].name}</option>`;
            }
            document.getElementById("id").innerHTML = categories;
        }
    })
    document.getElementById("display").innerHTML = form;
}

function searchByName() {
    let search = document.getElementById("search").value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/painting/search?name=" + search,
        success: function (data) {
            console.log(data);
            let painting = "";
            painting += `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Width</th>
                    <th>Material</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Categories</th>
                    <th>Actions</th>
                    </tr>`;

            for (let i = 0; i < data.length; i++) {
                painting += `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].height}</td>
                    <td>${data[i].width}</td>
                    <td>${data[i].material}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].price}</td>
                    <td>`;

                for (let j = 0; j < data[i].categories.length; j++) {
                    painting += `${data[i].categories[j].name}`;

                    if (j < data[i].categories.length - 1) {
                        painting += ", ";
                    }
                }

                painting += `</td>
                <td><button onclick="showFormUpdated(${data[i].id})">Update</button></td>
                <td><button onclick="deleteById(${data[i].id})">Delete</button></td>
                </tr>`;
            }

            painting += `</table>`;
            document.getElementById("display").innerHTML = painting;
        }
    });
}
function searchByCategory() {
    let categoryId = document.getElementById("id").value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/painting/searchbycategory/" + categoryId,
        success: function (data) {
            console.log(data);
            let painting = "";
            painting += `
            <table border="1px">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Width</th>
                    <th>Material</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Categories</th>
                    <th>Actions</th>
                </tr>`
            for (let i = 0; i < data.length; i++) {
                painting += `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].height}</td>
                    <td>${data[i].width}</td>
                    <td>${data[i].material}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].price}</td>
                    <td>`;

                for (let j = 0; j < data[i].categories.length; j++) {
                    painting += `${data[i].categories[j].name}`;

                    if (j < data[i].categories.length - 1) {
                        painting += ", ";
                    }
                }

                painting += `</td>
                <td><button onclick="showFormUpdated(${data[i].id})">Update</button></td>
                <td><button onclick="deleteById(${data[i].id})">Delete</button></td>
                </tr>`;
            }

            painting += `</table>`;
            document.getElementById("display").innerHTML = painting;
        }
    });
}
function deleteById(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/painting/" + id,
        success: function () {
            showAll();
        }
    });
}


