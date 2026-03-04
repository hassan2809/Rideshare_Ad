"use client";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { PageDetailsField, UserRoleType } from "../../Utils/types";
import ProfileHeader from "../Common/ProfileHeader";
import PageDetailsBlock, {
  commonDetailsPageFields,
} from "../Common/PageDetailsBlock";
import DeleteDialog from "../Common/DeleteDialog";
import {
  isDriverLoggedIn,
  isSuperAdminLoggedIn,
  isUserLoggedIn,
} from "../../Services/userService";
import { useTranslation } from "react-i18next";
import { allRoutes } from "../../Routes/AllRoutes";
import TableBlock from "../Common/Table/TableBlock";
import { useSelector } from "../../Redux/reduxHooks";
import { selectUser } from "../../Redux/Slices/userSlice";
import { useParams, useRouter } from "next/navigation";
import { deleteAd, getAdById } from "@/app/Services/adsService";
import { deleteBrand, getBrandById } from "@/app/Services/brandsService";
import {
  deleteInfluencer,
  getInfluencerById,
} from "@/app/Services/influencersService";
import { deletePost, getPostById } from "@/app/Services/postsService";
import { deleteSpot, getSpotById } from "@/app/Services/spotsService";
import { deleteDriver, getDriverById } from "@/app/Services/driversService";

interface EntityDetailsPageProps {
  entityType: UserRoleType;
  fields?: PageDetailsField[];
  editRoute: string;
  backRoute?: string;
  checkEditAccess?: (props: any) => boolean;
  isMyProfilePage?: boolean;
  getExtraSectionData?: (prop: any) => {
    getItemsFn: (id: string) => Promise<any>;
    heading: string;
    subHeading: string;
    headers: Array<any>;
    emptyStateMessage: string;
    detailsPagePath: string;
  };
}

const EntityDetailsPage = ({
  entityType,
  fields,
  editRoute,
  backRoute,
  checkEditAccess,
  isMyProfilePage,
  getExtraSectionData,
}: EntityDetailsPageProps) => {
  const { t } = useTranslation();
  const { id }: { id: string } = useParams();

  const router = useRouter();
  const isSuperAdmin = isSuperAdminLoggedIn();
  const isDriver = isDriverLoggedIn();
  const isLoggedIn = isUserLoggedIn();
  const user = useSelector(selectUser);
  const dependency = isMyProfilePage ? user : null;

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    getDetails();
  }, [dependency]);

  const getDetails = async () => {
    // TODO: Important if influencer logged in, and he opens the influencerDetails page with his id it should take him to MYPROFILE page, same for brand etc

    if (isMyProfilePage) {
      if (!user._id) return;
    } else {
      if (!id && backRoute)
        return router.push(isLoggedIn ? backRoute : allRoutes.FEED);
    }

    setLoading(true);
    try {
      if (isMyProfilePage) {
        if (user && !data._id) setData(user);
      } else {
        const getDetailsFn =
          entityType === "Ad"
            ? getAdById
            : entityType === "Brand"
            ? getBrandById
            : entityType === "Influencer"
            ? getInfluencerById
            : entityType === "Post"
            ? getPostById
            : entityType === "Spot"
            ? getSpotById
            : entityType === "Driver"
            ? getDriverById
            : null;

        const response = await getDetailsFn?.(id || "");
        setData(response);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(t(err));
      if (!isMyProfilePage && backRoute) {
        if (err.includes("not available") || err.includes("id was not found"))
          router.push(isLoggedIn ? backRoute : allRoutes.FEED);
        else router.push(backRoute);
      }
    }
    setLoading(false);
  };

  const openDeleteDialog = () => setDeleteDialog(true);
  const closeDeleteDialog = () => setDeleteDialog(false);

  const handleEdit = () => router.push(editRoute.replace(":id", id || ""));

  const handleDelete = async () => {
    const deleteFn =
      entityType === "Ad"
        ? deleteAd
        : entityType === "Brand"
        ? deleteBrand
        : entityType === "Influencer"
        ? deleteInfluencer
        : entityType === "Post"
        ? deletePost
        : entityType === "Spot"
        ? deleteSpot
        : entityType === "Driver"
        ? deleteDriver
        : null;

    if (!deleteFn) return;
    try {
      const result: any = await deleteFn(id || "");
      if (result?.includes("successfully")) {
        toast.success(t(result));
        if (backRoute) router.push(backRoute);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(t(err));
      if (backRoute) router.push(backRoute);
    }
  };

  const detailsBlockFields = fields || commonDetailsPageFields;

  const canEditOrDelete =
    isMyProfilePage && !isDriver
      ? true
      : isSuperAdmin || !!checkEditAccess?.(data);

  const extraSectionData = getExtraSectionData?.(data);

  return (
    <>
      <ProfileHeader
        isSquarish={["Post", "Ad", "Spot"].includes(entityType)}
        data={data}
        userType={entityType}
        handleEdit={handleEdit}
        handleDelete={openDeleteDialog}
        hideButtons={!canEditOrDelete}
        isLoading={loading}
        hideDeleteButton={isMyProfilePage}
      />

      <PageDetailsBlock
        data={data}
        fields={detailsBlockFields}
        isLoading={loading}
        showBottomDivider={!!extraSectionData}
      />

      {!!extraSectionData && (
        <TableBlock
          heading={extraSectionData.heading}
          subHeading={extraSectionData.subHeading}
          tableHeaders={extraSectionData.headers}
          emptyStateMessage={extraSectionData.emptyStateMessage}
          detailsPagePath={extraSectionData.detailsPagePath}
          getDataFn={() =>
            extraSectionData?.getItemsFn(
              (isMyProfilePage ? user?._id : id) || ""
            )
          }
          rowsPerPage={5}
        />
      )}

      {!isMyProfilePage && (
        <DeleteDialog
          open={deleteDialog}
          onClose={closeDeleteDialog}
          userType={entityType}
          user={data}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default EntityDetailsPage;
