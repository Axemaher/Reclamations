import SettingDefinition from "../../components/SettingDefinition/SettingDefinition";
function SettingsPage() {
  return (
    <>
      <h1>Ustawienia</h1>
      <SettingDefinition
        settingDataName={"deliveryMethod"}
        label={"metoda dostawy"}
      />
      ------------
      <SettingDefinition settingDataName={"type"} label={"typ"} />
      ------------
      <SettingDefinition settingDataName={"priority"} label={"priorytet"} />
      ------------
      <SettingDefinition settingDataName={"status"} label={"status"} />
      ------------
      <SettingDefinition settingDataName={"reason"} label={"powód"} />
      ------------
      <SettingDefinition
        settingDataName={"paymentMethod"}
        label={"metoda płatności"}
      />
    </>
  );
}

export default SettingsPage;
