/* -------------------- Components -------------------- */
import AppLogo from "../components/app/AppLogo.vue";
import AppName from "../components/app/AppName.vue";
import CustomInput from "../components/core/custom-input/CustomInput.vue";
import CustomCheckbox from "../components/core/custom-input/CustomCheckbox.vue";
import Spinner from "../components/core/Spinner.vue";
import TableHeaderCell from "../components/core/Table/TableHeaderCell.vue";

/* ----------------------- Views ---------------------- */
import AdminPageLayout from "../views/admin/layout/AdminPageLayout.vue";
import AuthPageLayout from "../views/auth/layout/AuthPageLayout.vue";
import AdminLogout from "../views/auth/admin/Logout.vue";
import Logout from "../views/auth/app/Logout.vue";

export default {
  install: (app) => {
    /* -------------------- Components -------------------- */
    app.component("AppLogo", AppLogo);
    app.component("AppName", AppName);
    app.component("CustomInput", CustomInput);
    app.component("CustomCheckbox", CustomCheckbox);
    app.component("Spinner", Spinner);
    app.component("TableHeaderCell", TableHeaderCell);

    /* ----------------------- Views ---------------------- */
    app.component("AdminPageLayout", AdminPageLayout);
    app.component("AuthPageLayout", AuthPageLayout);
    app.component("AdminLogout", AdminLogout);
    app.component("Logout", Logout);
  },
};
