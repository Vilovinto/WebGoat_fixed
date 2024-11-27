$(function () {
    // Збереження повторюваних селекторів у змінні
    const $toolbarAdmin = $("#toolbar-admin");
    const $colCheck = $(".col-check");
    const $table = $("table");

    $colCheck.hide();

    $('#btn-admin').on('click', function () {
        if ($toolbarAdmin.is(":visible")) {
            $toolbarAdmin.hide();
            $colCheck.hide();
        } else {
            $toolbarAdmin.show();
            $colCheck.show();
        }
    });

    $('#btn-online').on('click', function () {
        updateStatus('success', 'online');
    });

    $('#btn-offline').on('click', function () {
        updateStatus('warning', 'offline');
    });

    $('#btn-out-of-order').on('click', function () {
        updateStatus('danger', 'out of order');
    });

    function updateStatus(className, statusText) {
        $table.find('tr:has(:checkbox:checked)').each(function () {
            const $row = $(this);
            $row.removeClass().addClass(className);
            $row.find('td.status').text(statusText);
        });
    }
});

$(document).ready(function () {
    getServers('id');
});

function getServers(column) {
    $.get("SqlInjectionMitigations/servers?column=" + encodeURIComponent(column), function (result) {
        const $servers = $("#servers");
        $servers.empty();
        result.forEach(serverData => {
            const serverRow = createServerRow(serverData);
            $servers.append(serverRow);
        });
    });
}

function createServerRow(serverData) {
    const row = document.createElement('tr');
    row.className = getStatusClass(serverData.status);

    // Checkbox column
    const checkBoxTd = document.createElement('td');
    checkBoxTd.className = 'col-check';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'form-check-input';
    checkBoxTd.appendChild(checkBox);
    row.appendChild(checkBoxTd);

    // Hostname column
    const hostnameTd = document.createElement('td');
    hostnameTd.textContent = serverData.hostname;
    row.appendChild(hostnameTd);

    // IP column
    const ipTd = document.createElement('td');
    ipTd.textContent = serverData.ip;
    row.appendChild(ipTd);

    // MAC column
    const macTd = document.createElement('td');
    macTd.textContent = serverData.mac;
    row.appendChild(macTd);

    // Status column
    const statusTd = document.createElement('td');
    statusTd.className = 'status';
    statusTd.textContent = serverData.status;
    row.appendChild(statusTd);

    // Description column
    const descriptionTd = document.createElement('td');
    descriptionTd.textContent = serverData.description;
    row.appendChild(descriptionTd);

    return row;
}

function getStatusClass(status) {
    switch (status) {
        case 'offline':
            return 'warning';
        case 'out of order':
            return 'danger';
        default:
            return 'success';
    }
}
