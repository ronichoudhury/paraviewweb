import React            from 'react';
import PropertyGroup    from '../ProxyPropertyGroupWidget';
import style            from 'PVWStyle/ReactWidgets/ProxyEditorWidget.mcss';

export default React.createClass({

  displayName: 'ProxyEditorWidget',

  propTypes: {
    advanced: React.PropTypes.bool,
    children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    onApply: React.PropTypes.func,
    sections: React.PropTypes.array.isRequired,
  },

  getDefaultProps() {
    return {
      advanced: false,
    };
  },

  getInitialState() {
    return {
      advanced: this.props.advanced,
      changeSet: {},
      filter: null,
    };
  },

  toggleAdvanced() {
    const advanced = !this.state.advanced;
    this.setState({ advanced });
  },

  updateFilter(event) {
    const filter = event.target.value;
    this.setState({ filter });
  },

  updateChangeSet(change) {
    const changeSet = Object.assign({}, this.state.changeSet, change);
    this.setState({ changeSet });
  },

  applyChanges() {
    if (this.props.onApply) {
      this.props.onApply(this.state.changeSet);
    }
    // Reset changeSet
    this.setState({ changeSet: {} });
  },

  render() {
    const changeCount = Object.keys(this.state.changeSet).length;
    return (
      <div className={ style.container }>
        <div className={ style.toolbar }>
          <i
            className={ this.state.advanced ? style.activeAdvancedButton : style.advancedButton }
            onClick={ this.toggleAdvanced }
          ></i>
          <input
            type="text"
            placeholder="filter properties..."
            onChange={ this.updateFilter }
            className={ style.filter }
          />
          <i
            className={ changeCount ? style.validateButtonOn : style.validateButton }
            onClick={ this.applyChanges }
          ></i>
        </div>
        <div className={ style.contentContainer }>
          { this.props.children }
          { this.props.sections.map(section =>
            <PropertyGroup
              key={ section.name }
              proxy={ section }
              filter={ this.state.filter }
              collapsed={ section.collapsed }
              advanced={ this.state.advanced }
              onChange={ this.updateChangeSet }
            />
          )}
        </div>
      </div>);
  },
});
