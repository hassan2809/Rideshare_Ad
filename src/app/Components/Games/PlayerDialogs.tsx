import GameUserDialog from "./GameUserDialog";

const PlayerDialogs = ({
  showStartingModal,
  onStart,
  showEndingModal,
  onEnd,
}: {
  showStartingModal: boolean;
  onStart: (data: any) => void;
  showEndingModal: boolean;
  onEnd: (data: any) => void;
}) => (
  <>
    <GameUserDialog open={showStartingModal} onUpdate={onStart} />
    <GameUserDialog finishingVariant open={showEndingModal} onUpdate={onEnd} />
  </>
);

export default PlayerDialogs;
