<script setup>
import { ref, onMounted } from "vue";
// import { exportEncryptedDB } from '@/services/dbService'
import {
  importDatabaseFromServer,
  deleteInvoice,
  syncWithServer,
  getInvoices,
  addInvoice,
  updateInvoice   
} from "@/services/dbService";

const artists = ref([]);
const invoices = ref([]);

const isAdd = ref(false);

const newArtistName = ref("");
const editArtistName = ref("");
const selectedArtistId = ref(null);
const customInvoice = [
  {
    InvoiceId: 1,
    CustomerId: 2,
    InvoiceDate: "2007-01-01 00:00:00",
    BillingAddress: "Theodor-Heuss-Straße 34",
    BillingCity: "Stuttgart",
    BillingState: null,
    BillingCountry: "Germany",
    BillingPostalCode: "70174",
    Total: 1.98,
  },
  {
    InvoiceId: 2,
    CustomerId: 4,
    InvoiceDate: "2007-01-02 00:00:00",
    BillingAddress: "Ullevålsveien 14",
    BillingCity: "Oslo",
    BillingState: null,
    BillingCountry: "Norway",
    BillingPostalCode: "0171",
    Total: 3.96,
  },
  {
    InvoiceId: 3,
    CustomerId: 8,
    InvoiceDate: "2007-01-03 00:00:00",
    BillingAddress: "Grétrystraat 63",
    BillingCity: "Brussels",
    BillingState: null,
    BillingCountry: "Belgium",
    BillingPostalCode: "1000",
    Total: 5.94,
  },
  {
    InvoiceId: 4,
    CustomerId: 14,
    InvoiceDate: "2007-01-06 00:00:00",
    BillingAddress: "8210 111 ST NW",
    BillingCity: "Edmonton",
    BillingState: "AB",
    BillingCountry: "Canada",
    BillingPostalCode: "T6G 2C7",
    Total: 8.91,
  },
  {
    InvoiceId: 5,
    CustomerId: 23,
    InvoiceDate: "2007-01-11 00:00:00",
    BillingAddress: "69 Salem Street",
    BillingCity: "Boston",
    BillingState: "MA",
    BillingCountry: "USA",
    BillingPostalCode: "2113",
    Total: 13.86,
  },
];
onMounted(async () => {
  await importDatabaseFromServer(
    "https://raw.githubusercontent.com/m79yashar/sqlitr-db/refs/heads/main/chinook.enc.txt"
    // 'https://raw.githubusercontent.com/eltechno/python_course/master/Chinook.sqlite'
  );
  // artists.value = await getArtists(300)
  invoices.value = await getInvoices();
  console.log("invoices:", invoices.value);

  await syncWithServer("https://raw.githubusercontent.com/m79yashar/sqlitr-db/refs/heads/main/");
});

const formData = ref({
  // InvoiceId: null,
  CustomerId: null,
  InvoiceDate: null,
  BillingAddress: null,
  BillingCity: null,
  BillingState: null,
  BillingCountry: null,
  BillingPostalCode: null,
  Total: null,
});

async function add() {
  await addInvoice(formData.value);
  formData.value = {
    // InvoiceId: null,
    CustomerId: null,
    InvoiceDate: null,
    BillingAddress: null,
    BillingCity: null,
    BillingState: null,
    BillingCountry: null,
    BillingPostalCode: null,
    Total: null,
  };
  invoices.value = await getInvoices();
  isAdd.value = false;
}

const selectedforEdit = ref(null);
const isEdite = ref(false);

async function update() {
  await updateInvoice(selectedforEdit.value.InvoiceId, selectedforEdit.value);
  selectedforEdit.value = null;
  isEdite.value = false;
  invoices.value = await getInvoices();
}

//     BillingCity: null,
//     BillingState: null,
//     BillingCountry: null,
//     BillingPostalCode: null,
//     Total: null,
//   };
//   
// }

async function remove(id) {
  if (!confirm("آیا مطمئن هستید که می‌خواهید حذف کنید؟")) return;
  await deleteInvoice(id);
  invoices.value = await getInvoices();
}

// function downloadEncrypted() {
//   exportEncryptedDB('chinook.enc.txt') // دانلود نسخه رمز شده
// }
</script>

<template>
  <div>
    <h1>مدیریت آرتیست‌ها</h1>
    <!-- <button @click="downloadEncrypted">دانلود دیتابیس رمزگذاری‌شده</button> -->
    <!-- <div>
      <input v-model="newArtistName" placeholder="نام آرتیست جدید" />
      <button @click="add">افزودن</button>
    </div>

    <div v-if="selectedArtistId">
      <input v-model="editArtistName" placeholder="ویرایش نام آرتیست" />
      <button @click="update">ثبت تغییرات</button>
    </div>

    <ul>
      <li v-for="a in artists.reverse()" :key="a.id">
        {{ a.id }} - {{ a.name }}
        <button @click="selectForEdit(a)">ویرایش</button>
        <button @click="remove(a.id)">حذف</button>
      </li>
    </ul> -->

    <table>
      <caption>
        <button v-if="!isAdd" @click="isAdd = true" style="margin-bottom: 10px">add new</button>
        <button @click="syncInvoicesList(customInvoice)" style="margin-bottom: 10px">sync List</button>

        <form v-if="isAdd" style="border: 1px solid; width: max-content; padding: 20px; margin-bottom: 10px;">
          <label for="CustomerId">CustomerId: </label><br />
          <input type="text" id="CustomerId" name="CustomerId" v-model="formData.CustomerId" /><br />
          <label for="InvoiceDate">InvoiceDate: </label><br />
          <input type="text" id="InvoiceDate" name="InvoiceDate" v-model="formData.InvoiceDate" /><br />
          <label for="BillingAddress">BillingAddress: </label><br />
          <input type="text" id="BillingAddress" name="BillingAddress" v-model="formData.BillingAddress" /><br />
          <label for="BillingCity">BillingCity: </label><br />
          <input type="text" id="BillingCity" name="BillingCity" v-model="formData.BillingCity" /><br />
          <label for="BillingState">BillingState: </label><br />
          <input type="text" id="BillingState" name="BillingState" v-model="formData.BillingState" /><br />
          <label for="BillingCountry">BillingCountry: </label><br />
          <input type="text" id="BillingCountry" name="BillingCountry" v-model="formData.BillingCountry" /><br />
          <label for="BillingPostalCode">BillingPostalCode: </label><br />
          <input type="text" id="BillingPostalCode" name="BillingPostalCode" v-model="formData.BillingPostalCode" /><br />
          <label for="Total">Total: </label><br />
          <input type="text" id="Total" name="Total" v-model="formData.Total" /><br /><br />
          <input type="submit" value="Submit" @click="add"/>
        </form>
        <form v-if="isEdite" style="border: 1px solid; width: max-content; padding: 20px; margin-bottom: 10px;">
          <label for="CustomerId">CustomerId: </label><br />
          <input type="text" id="CustomerId" name="CustomerId" v-model="selectedforEdit.CustomerId" /><br />
          <label for="InvoiceDate">InvoiceDate: </label><br />
          <input type="text" id="InvoiceDate" name="InvoiceDate" v-model="selectedforEdit.InvoiceDate" /><br />
          <label for="BillingAddress">BillingAddress: </label><br />
          <input type="text" id="BillingAddress" name="BillingAddress" v-model="selectedforEdit.BillingAddress" /><br />
          <label for="BillingCity">BillingCity: </label><br />
          <input type="text" id="BillingCity" name="BillingCity" v-model="selectedforEdit.BillingCity" /><br />
          <label for="BillingState">BillingState: </label><br />
          <input type="text" id="BillingState" name="BillingState" v-model="selectedforEdit.BillingState" /><br />
          <label for="BillingCountry">BillingCountry: </label><br />
          <input type="text" id="BillingCountry" name="BillingCountry" v-model="selectedforEdit.BillingCountry" /><br />
          <label for="BillingPostalCode">BillingPostalCode: </label><br />
          <input type="text" id="BillingPostalCode" name="BillingPostalCode" v-model="selectedforEdit.BillingPostalCode" /><br />
          <label for="Total">Total: </label><br />
          <input type="text" id="Total" name="Total" v-model="selectedforEdit.Total" /><br /><br />
          <input type="submit" value="Submit" @click="update"/>
        </form>
      </caption>
      <thead>
        <tr>
          <th>id</th>
          <th>customerId</th>
          <th>date</th>
          <th>billingAddress</th>
          <th>billingCity</th>
          <th>billingState</th>
          <th>billingCountry</th>
          <th>billingPostalCode</th>
          <th>total</th>
          <th>delete</th>
          <th>edite</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in invoices" :key="item.InvoiceId">
          <td>{{ item.InvoiceId }}</td>
          <td>{{ item.CustomerId }}</td>
          <td>{{ item.InvoiceDate }}</td>
          <td>{{ item.BillingAddress }}</td>
          <td>{{ item.BillingCity }}</td>
          <td>{{ item.BillingState }}</td>
          <td>{{ item.BillingCountry }}</td>
          <td>{{ item.BillingPostalCode }}</td>
          <td>{{ item.Total }}</td>
          <td>
            <button @click="remove(item.InvoiceId)">حذف</button>
          </td>
          <td>
            <button @click="selectedforEdit = { ...item }; isEdite = true">ویرایش</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
