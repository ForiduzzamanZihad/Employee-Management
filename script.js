document.addEventListener('DOMContentLoaded', function() {
    const employeeTable = document.querySelector('#employeeTableBody');
    let employees = [];
    let employeeToDeleteIndex = null;

    // Initialize datepicker
    $('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' });

    // Function to render employees in the table
    function renderEmployees() {
        employeeTable.innerHTML = '';  // Clear the current table
        employees.forEach((employee, index) => {
            const row = `
                <tr>
                    <td>
                        ${employee.photo ? 
                        `<img src="${employee.photo}" alt="Photo" style="width: 50px; height: 50px; border-radius: 50%; box-shadow: 0px 0px 5px #888;">` : 
                        `<i class="fas fa-user employee-photo-placeholder" style="font-size: 30px; color: #007bff;"></i>`} <!-- Placeholder Icon -->
                    </td>
                    <td>${employee.fullName}</td>
                    <td class="email-column">${employee.email}</td>
                    <td>${employee.mobile}</td>
                    <td>${employee.dob}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="editEmployee(${index})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="confirmDeleteEmployee(${index})"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
            `;
            employeeTable.innerHTML += row;
        });
    }
    

    // Add employee
    document.getElementById('addEmployeeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const dob = document.getElementById('dob').value;

        const photoInput = document.getElementById('photo');
        const photoFile = photoInput.files[0];

        // Create a URL for the uploaded photo to display it
        const photoUrl = photoFile ? URL.createObjectURL(photoFile) : null;

        // Store employee details in the employees array
        employees.push({ fullName, email, mobile, dob, photo: photoUrl });

        // Re-render the table with the updated employees array
        renderEmployees();

        // Close the modal and reset the form
        $('#addEmployeeModal').modal('hide');
        document.getElementById('addEmployeeForm').reset();
    });

    // Confirm delete employee
    window.confirmDeleteEmployee = function(index) {
        employeeToDeleteIndex = index;
        $('#deleteConfirmModal').modal('show');
    };

    // Delete employee
    document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
        if (employeeToDeleteIndex !== null) {
            employees.splice(employeeToDeleteIndex, 1);
            renderEmployees();
            $('#deleteConfirmModal').modal('hide');
        }
    });

    // Placeholder for edit functionality
    window.editEmployee = function(index) {
        alert('Edit functionality to be implemented for employee: ' + employees[index].fullName);
    };

    // Initial render (in case employees array is not empty)
    renderEmployees();
});
