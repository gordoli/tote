import React, { useState, useEffect } from "react";
import { Modalize } from "react-native-modalize";

import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import styles from "./styles";
import { View } from "@/app/components/Themed";
import LoadingScreen from "../../components/LoadingScreen";
import { useBrand } from "../../hooks/useBrand";

const RankModals = ({
  modalizeRef,
  brandId,
  rankProduct = null,
}: {
  modalizeRef: any;
  brandId: number;
  rankProduct?: any,
}) => {
  const [step, setStep] = useState(1);
  const {
    loadingStep,
    categories,
    rankingData,
    handleGetCategories,
    handleUpdateRankingData,
    handleRankProduct,
  } = useBrand(brandId);

  useEffect(() => {
    handleGetCategories();
  }, []);

  useEffect(() => {
    if (rankProduct) {
      handleUpdateRankingData({
        rate: rankProduct.rate,
        brandId: rankProduct.brand.id,
        categoryId: rankProduct.category.id,
        link: rankProduct.link,
        image: rankProduct.image,
        name: rankProduct.name,
        description: rankProduct.description,
      });
    }
  }, [rankProduct]);

  const cancelModal = () => {
    resetFormData();
    modalizeRef.current?.close();
  };

  const resetFormData = () => {
    handleUpdateRankingData({
      rate: 0,
      brandId: brandId,
      categoryId: 0,
      link: "",
      image: null,
      name: "",
      description: "",
    });
  };

  const nextStepAction = (num: number, value: any) => {
    const newData = { ...rankingData };
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
      default:
        break;
    }
    handleUpdateRankingData(newData);
    if (num === 5) {
      console.log("Final Ranking Data:", newData);
      const productId = rankProduct ? rankProduct.id : 0;
      handleRankProduct(newData, () => {
        cancelModal();
      }, productId);
      // setTimeout(() => {
      //   handleRankProduct();
      // }, 1000);
    } else {
      console.log("Rank Data:", newData);
      setStep(num);
    }
  };

  const handleCancelStep = () => {
    setStep(1);
    cancelModal && cancelModal();
  };

  const handleBackPreviousStep = (num: number) => {
    setStep(num);
  };

  const onClosed = () => {
    setStep(1);
    resetFormData();
  };

  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      adjustToContentHeight
      closeOnOverlayTap={false}
      onClosed={onClosed}
    >
      <View className="justify-between w-full p-4 pb-10 bg-white flex-column rounded-2xl">
        {step === 1 &&
          (loadingStep ? (
            <LoadingScreen customeStyles={styles.loadingStyle} />
          ) : (
            <Step1
              cancelModal={handleCancelStep}
              nextStep={nextStepAction}
              data={categories}
              dataRanking={rankingData}
            />
          ))}
        {step === 2 && (
          <Step2
            nextStep={nextStepAction}
            backPreviousStep={handleBackPreviousStep}
            data={rankingData}
          />
        )}
        {step === 3 && (
          <Step3
            nextStep={nextStepAction}
            backPreviousStep={handleBackPreviousStep}
            data={rankingData}
          />
        )}
        {step === 4 && (
          <Step4
            nextStep={nextStepAction}
            loading={loadingStep}
            backPreviousStep={handleBackPreviousStep}
          />
        )}
      </View>
    </Modalize>
  );
};

export default RankModals;
