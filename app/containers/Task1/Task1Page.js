/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import forIn from 'lodash/forIn';
import QuesMarksInput from './QuesMarksInput';
import { getFinalScore } from './utils';
import { Questions } from './constant';
import NavLink from '../../components/NavLink';

import './styles.scss';


export default class TaskPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {},
      finalScore: undefined,
    };
  }
  // shouldComponentUpdate() {
  //   return false;
  // }

  changeInputValue = (value, key) => {
    const { inputValues } = this.state;
    inputValues[key] = value;
    this.setState({
      inputValues,
    });
  }

  showFinalScore = () => {
    const { inputValues } = this.state;
    if (Object.keys(inputValues).length === Object.keys(Questions).length) {
      const finalScore = getFinalScore(inputValues);
      this.setState({
        finalScore,
      });
    } else {
      alert('Please enter all details');
    }
  };

  render() {
    const {
      inputValues,
      finalScore,
    } = this.state;
    const quesView = [];
    forIn(Questions, (value, key) => {
      quesView.push(
        <QuesMarksInput
          maxValue={value.maxMark}
          quesNumber={key}
          value={inputValues[key]}
          onChangeMarks={(e) => this.changeInputValue(e.target.value, key)}
        />
      );
    });
    return (
      <div>
        <Helmet>
          <title>Task 1</title>
          <meta
            name="task1"
            content="Task 1 page"
          />
        </Helmet>
        <div>
          <NavLink to="/" label="Back" />
        </div>
        <h1>Task 1(Question paper problem)</h1>
        <h3>Please enter marks obtained for every ques below</h3>
        <div>
          {quesView}
        </div>
        {/* eslint-disable */}
        <div className="button-wrapper">
          <div
            className={'button-class'}
            onClick={() => this.showFinalScore()}
          >
            Get final score
          </div>
        </div>
        {!isNaN(finalScore)  && <div>
          {`Final Score: ${finalScore}`}
        </div>}
        {/* eslint-enable */}
      </div>
    );
  }
}
