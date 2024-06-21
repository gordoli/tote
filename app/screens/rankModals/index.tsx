import React, { useState } from "react";
import {Modalize} from 'react-native-modalize';

import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import styles from "./styles";
import { View } from "@/app/components/Themed";
import LoadingScreen from "../../components/LoadingScreen";
import { DUMMY_PRODUCTS, Category, RankingData } from "@/app/lib/types";

const RankModals = ({
  cancelModal,
  modalizeRef,
  loading,
  categories,
  data,
  handleUpdateRankingData,
  handleRankProduct,
}: {
  cancelModal: () => void,
  modalizeRef: any,
  loading: boolean,
  categories: Category[],
  data: RankingData,
  handleUpdateRankingData: (value: any) => void,
  handleRankProduct: () => void,
}) => {
  const [step, setStep] = useState(1);

  const nextStepAction = (num: number, value: any) => {
    const newData = {...data};
    switch (num) {
      case 2:
        newData.categoryId = value;
        break;
      case 3:
        newData.name = value.name;
        newData.description = value.description;
        break;
      case 4:
        newData.link = value.link;
        newData.image = value.image;
        break;
      case 5:
        newData.rate = value;
        break;
      case 6:
        // newData.preferProductId = value;
        break;
      default:
        break;
    }
    handleUpdateRankingData(newData);
    setStep(num);
  };

  const handleCancelStep = () => {
    setStep(1);
    cancelModal && cancelModal();
  };

  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      adjustToContentHeight
      closeOnOverlayTap={false}
    >
      <View className="bg-white w-full flex-column justify-between p-4 pb-10 rounded-2xl">
        {step === 1 && (
          loading ? (
            <LoadingScreen customeStyles={styles.loadingStyle}/>
          ) : (
            <Step1
              cancelModal={handleCancelStep}
              nextStep={nextStepAction}
              data={categories}
            />
          )
        )}
        {step === 2 && (
          <Step2
            cancelModal={handleCancelStep}
            nextStep={nextStepAction}
          />
        )}
        {step === 3 && (
          <Step3
            cancelModal={handleCancelStep}
            nextStep={nextStepAction}
          />
        )}
        {step === 4 && (
          <Step4
            cancelModal={handleCancelStep}
            nextStep={nextStepAction}
            product={DUMMY_PRODUCTS[0]}
          />
        )}
        {step === 5 && (
          loading ? (
            <LoadingScreen customeStyles={styles.loadingStyle}/>
          ) : (
            <Step5
              cancelModal={handleCancelStep}
              handlSelectItem={nextStepAction}
              handlRanking={handleRankProduct}
            />
          )
        )}
      </View>
    </Modalize>
  );
}

export default RankModals;
