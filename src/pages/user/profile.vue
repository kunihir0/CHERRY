<script setup lang='ts'>
import { onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import appstore from "../../store";

const userStore = appstore.useUserStore;

const userReturn = ref(null);
const route = useRoute();
const uploadProgress = ref(-1);
const uploadComplete = ref(false);
const fileName = ref("");
const fileSize = ref(0);

const fetchUser = async (email: string) => {
  try {
    const response = await axios.get(`/api/user/${email}`, {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    if (response.data) {
      userReturn.value = response.data;
    }
  } catch (err) {
    console.error(err);
  }
};

const uploadProfilePicture = async (event: Event) => {
  console.log("Handling file upload");
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    console.log("No file was selected");
    return;
  }
  fileName.value = file.name;
  fileSize.value = file.size;
  const formData = new FormData();
  formData.append("file", file);
  try {
    console.log("Sending POST request to /api/user/:email/profile-picture");
    const response = await axios.post(`/api/user/${route.params.email}/profile-picture`, formData, {
      headers: {
        "Authorization": `Bearer ${userStore.token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
    });
    if (response.data) {
      // Handle successful upload
      console.log("Upload successful");
      uploadComplete.value = true;
    }
  } catch (err) {
    console.error("An error occurred while uploading the file", err);
  }
};

onMounted(() => {
  fetchUser(route.params.email);
});

watch(
  () => route.params.email,
  (newEmail) => {
    fetchUser(newEmail);
  },
);
</script>

<template>
  <div class="max-w-screen-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      User Profile
    </h1>
    <img src="../../assets/2.jpg" class="w-full h-40 object-cover">
    <div v-if="userReturn">
      <div class="avatar">
        <div class="w-24 rounded-xl">
          <img src="../../assets/1.jpg">
        </div>
      </div>
      <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            {{ userReturn.firstName }} {{ userReturn.lastName }}
          </h2>
          <p>ID: {{ userReturn.id }}</p>
          <p>Email: {{ userReturn.email }}</p>
          <p>Created At: {{ new Date(userReturn.createdAt).toLocaleString() }}</p>
          <textarea class="textarea h-24" placeholder="{{ userReturn.bio }}" disabled />
        </div>
      </div>
      <!-- display sensitive information here -->
      <div v-if="userStore.isAuthenticated && userReturn.id === userStore.user.id">
        <h1 class="text-2xl font-bold mb-4">
          Settings (private)
        </h1>
        <p class="color-green">
          Password: {{ userReturn.password }}
        </p>
        <li><a onclick="showUploadModal.showModal()">Upload Profile Picture</a></li>

        <dialog id="showUploadModal" class="modal">
          <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">
              Upload Profile Picture
            </h3>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Pick a file</span>
              </label>
              <input type="file" class="file-input file-input-bordered w-full max-w-xs" @change="uploadProfilePicture">
            </div>
            <!-- Progress bar -->
            <progress v-if="uploadProgress >= 0" max="100" :value="uploadProgress" />
            <!-- End progress bar -->
            <div v-if="uploadProgress >= 0" class="my-4">
              <p>Uploading {{ fileName }} ({{ fileSize }} bytes)</p>
            </div>
            <div v-if="uploadComplete" class="my-4 text-green-500 font-bold">
              ✔️ Upload complete!
            </div>
            <div class="modal-action">
              <button class="btn btn-primary" click.prevent="showUploadModal.showModal()">
                Close
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  animation: toast-in-right 0.7s;
}

@keyframes toast-in-right {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
