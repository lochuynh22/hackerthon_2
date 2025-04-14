let studentList = [
    {
        name: "Trần Minh Cường",
        idStudent: "SV001",
        Email: "minhcuong@gmail.com",
        class: "HCM_KS24A"
    },
    {
        name: "Student_1",
        idStudent: "SV002",
        Email: "student_1@gmail.com",
        class: "HCM_KS24A"
    },
];

const tbody = document.querySelector("tbody");
let btnbtnSaveEL = document.querySelector("#btnbtnSave_edit");
let studentEditIndex = null;



function renderData(data = studentList) {
    let dataHtml = ``;
    for (let i = 0; i < data.length; i++) {
        const studentIndex = studentList.indexOf(data[i]);
        dataHtml += `
        <tr>
            <th scope="row">${data[i].name}</th>
            <td>${data[i].idStudent}</td>
            <td>${data[i].Email}</td>
            <td>${data[i].class}</td>
            <td>
                <button id="edit" onclick="loadEditdata(${studentIndex})">Sửa</button>
                <button id="delete" onclick="deleteStudent(${studentIndex})">Xóa</button>
            </td>
        </tr>`;
    }
    tbody.innerHTML = dataHtml;
}
renderData();

function addStudent(e) {
    e.preventDefault();

    const form = e.target;

    const newStudent = {
        name: form.name.value,
        idStudent: form.idStudent.value,
        Email: form.email.value,
        class: form.class.value
    };

    if (studentEditIndex === null) {
        // them
        studentList.push(newStudent);
    } else {
        // sua
        studentList[studentEditIndex] = newStudent;
        studentEditIndex = null;
        btnbtnSaveEL.innerText = "Them sinh vien";
    }

    renderData();
    form.reset();
}

function deleteStudent(index) {
    if (window.confirm("ban co chac muon xoa sinh vien nay khong?")) {
        studentList.splice(index, 1);
        renderData();
        alert("Xoa thanh cong");
    }
}

function loadEditdata(index) {
    const studentEdit = studentList[index];
    const formEL = document.querySelector(".form_box form");

    formEL.name.value = studentEdit.name;
    formEL.idStudent.value = studentEdit.idStudent;
    formEL.email.value = studentEdit.Email;
    formEL.class.value = studentEdit.class;

    studentEditIndex = index;
    btnbtnSaveEL.innerText = "Lưu";
}

function searchStudent() {
    let studentSearch = document.querySelector('#ip_search').value.toLowerCase();
    let arrayResult = [];
    for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].name.toLowerCase().includes(studentSearch)) {
            arrayResult.push(studentList[i]);
        }
    }
    renderData(arrayResult);
}
document.querySelector('#ip_search').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchStudent();
    }
});

