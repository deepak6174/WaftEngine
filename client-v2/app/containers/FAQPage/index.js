/** *********
 *
 * FAQPage
 *
 *********** */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectFAQ } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

class FAQPage extends React.Component {
  state = {
    expanded: 'panel1',
    qExpanded: '',
  };

  componentDidMount() {
    this.props.loadFAQRequest();
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleQChange = panel => (event, expanded) => {
    this.setState({
      qExpanded: expanded ? panel : false,
    });
  };

  render() {
    const { faq } = this.props;

    const { expanded, qExpanded } = this.state;

    return (
      <div className="container">
        <Helmet>
          <title> FAQs </title>
        </Helmet>
        <div>
          <h1> FAQS </h1>
        </div>
        <div>
          {faq.cat &&
            faq.cat.map(
              x =>
                faq.faq &&
                faq.faq.filter(z => z.category == x._id).length !== 0 && (
                  <ExpansionPanel
                    key={`cat-${x._id}`}
                    square
                    expanded={expanded === x._id}
                    onChange={this.handleChange(x._id)}
                  >
                    <ExpansionPanelSummary>
                      <Typography variant="h2">{x.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'block' }}>
                      {faq.faq &&
                        faq.faq
                          .filter(z => z.category == x._id)
                          .map(y => (
                            <ExpansionPanel
                              key={`faq-${y._id}`}
                              expanded={qExpanded === y._id}
                              onChange={this.handleQChange(y._id)}
                            >
                              <ExpansionPanelSummary>
                                <Typography variant="h5">
                                  {y.question}
                                </Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                <Typography variant="h6">{y.title}</Typography>
                              </ExpansionPanelDetails>
                            </ExpansionPanel>
                          ))}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ),
            )}
        </div>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'faq', reducer });

const withSaga = injectSaga({ key: 'faq', saga });

const mapStateToProps = createStructuredSelector({
  faq: makeSelectFAQ(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FAQPage);