import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TrainingTrackList } from "./TrainingTrackList";
import { CreateTrainingTrack } from "./CreateTrainingTrack";
import { TrainingTrack } from "./TrainingTrack";

export const TrainingTrackIndex = (): React.ReactElement => {
  useBreadcrumbs("/training-tracks/", "Training Tracks");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/training-tracks/"}
        component={TrainingTrackList}
      />
      <PrivateRoute
        path={"/training-tracks/new"}
        component={CreateTrainingTrack}
      />
      <PrivateRoute path={"/training-tracks/:id"} component={TrainingTrack} />
    </Switch>
  );
};
